/* eslint-disable @typescript-eslint/no-explicit-any */
import { signal, effect, type Signal } from '@preact/signals'
import { useState, useEffect } from 'preact/hooks'

// 1. Tipo para la función 'set'
type SetState<T> = (newState: Partial<T> | ((state: T) => Partial<T>)) => void;

// 2. Tipo para el callback que define la store
type StoreInitializer<T> = (set: SetState<T>) => T;

// La función 'create' actualizada
export function create<T extends object> (initializer: StoreInitializer<T>) {
  // Aquí es donde almacenaremos los signals para cada propiedad
  const stateSignals: { [K in keyof T]: Signal<any> } = {} as { [K in keyof T]: Signal<any> }

  // La función 'get' para obtener el estado actual sin depender de signals (para selectores y setState con función)
  const get = (): T => {
    const currentState: T = {} as T
    for (const key in stateSignals) {
      (currentState as any)[key] = stateSignals[key].value
    }
    // Incluir también los métodos directamente
    for (const key in initialStoreRef.current) {
        if (typeof initialStoreRef.current[key] === 'function') {
            (currentState as any)[key] = initialStoreRef.current[key]
        }
    }
    return currentState
  }


  // La función 'set' que actualizará los signals
  const set: SetState<T> = (updater) => {
    const oldState = get() // Obtener el estado actual para el updater de función

    const newState = typeof updater === 'function' ? updater(oldState) : updater

    for (const key in newState) {
      if (Object.prototype.hasOwnProperty.call(stateSignals, key)) {
        // Solo actualiza si es un signal de estado
        stateSignals[key].value = newState[key]
      }
    }
  }

  // Guardar el estado inicial y los métodos definidos por el usuario una sola vez
  const initialStoreRef = { current: initializer(set) }
  const initialState = initialStoreRef.current // Descomponemos para crear signals del estado

  // Crea un signal para cada propiedad del estado inicial
  // y almacena los métodos directamente
  for (const key in initialState) {
    if (Object.prototype.hasOwnProperty.call(initialState, key)) {
      if (typeof initialState[key] === 'function') {
        // Los métodos se mantienen como están, no son signals
        // y no se re-renderizarán solos, pero son estables.
      } else {
        stateSignals[key] = signal(initialState[key])
      }
    }
  }

  // La función principal que se exporta y usa como hook
  // Permite selectores como en Zustand
  const useStore = <SelectorOutput>(
    selector: (state: T) => SelectorOutput = ((state: T) => state) as any
  ): SelectorOutput => {
    // Usamos useState para forzar una re-renderización cuando el valor seleccionado cambie
    const [selected, setSelected] = useState(() => selector(get()))

    useEffect(() => {
      let latestSelected = selected
      // Usamos effect para observar los signals y actualizar el estado del hook
      // Esto correrá una vez por cada signal que cambie si no usamos un batching
      // Para optimizar, podríamos observar el `get()` completo y luego seleccionar.
      const dispose = effect(() => {
        const newSelected = selector(get())
        if (newSelected !== latestSelected) { // Simple shallow compare
          latestSelected = newSelected
          setSelected(newSelected)
        }
      })

      return () => {
        dispose() // Limpia el efecto cuando el componente se desmonta
      }
    }, [selector]) // Dependencia del selector para re-ejecutar el efecto si el selector cambia (raro, pero posible)

    return selected
  }

  return useStore
}
