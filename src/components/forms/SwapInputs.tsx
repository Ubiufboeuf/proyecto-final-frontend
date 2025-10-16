import { useRef, useState, type ReactNode } from 'preact/compat'

export function SwapInputs ({ label, swap_label, children }: { label: string, swap_label: string, children: ReactNode[] }) {
  const [swap, setSwap] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const swapRef = useRef<HTMLInputElement>(null)

  const principal_input = children[0]
  const secondary_input = children[1]

  function toggleSwap () {
    setSwap((prevState) => !prevState)
  }
  
  return (
    <div
      ref={wrapperRef}
      class='w-full h-full relative'
    >
      <label
        class='absolute right-0 z-10 text-sm underline decoration-2 underline-offset-2 decoration-transparent hover:decoration-[unset] touch:active:decoration-[unset] cursor-pointer transition-colors text-blue-400'
        onInput={toggleSwap}
      >
        <input ref={swapRef} type='checkbox' hidden />
        {!swap && label}
        {swap && swap_label}
      </label>
      <div hidden={swap}>{principal_input}</div>
      <div hidden={!swap}>{secondary_input}</div>
    </div>
  )
}
