import { FormInput } from '../forms/Input'
import { Icon } from '../Icon'
import { IconSend } from '../Icons'

export function MessageForm ({ selectOptions }: { selectOptions: { text: string, value: string }[] }) {
	function handleSubmitForm () {
		
	}
		
  return (
    <form
			class='bg-white dark:bg-gray-700/50 dark:text-gray-200 dark:border-0 rounded-lg w-full h-fit flex-1 border border-gray-200 flex flex-col p-6 gap-6 [&_h1:not(&>h1)]:font-medium'
			onSubmit={handleSubmitForm}
		>
			<h1 class='text-xl font-semibold dark:text-gray-100'>Envíanos un Mensaje</h1>
			<div class='flex items-center justify-between w-full h-fit gap-4 md:flex-row flex-col'>
				<FormInput
					id='input-contact-name'
					name='input-contact-name'
					title='Nombre Completo'
					placeholder='Pepito Rodrigez'
					type='text'
					class='text-base'
					wrapperClass='w-full max-w-full'
					required
				/>
				<FormInput
					id='input-contact-tel'
					name='input-contact-tel'
					title='Teléfono'
					placeholder='+000 123 456 789'
					type='tel'
					class='text-base'
					wrapperClass='w-full max-w-full'
					required
				/>
			</div>
			<FormInput
				id='input-contact-email'
				name='input-contact-email'
				title='Correo'
				placeholder='correo@email.com'
				type='email'
				class='text-base'
				required
			/>
			<label class='group'>
				<h1>Asunto</h1>
				<select
					class='w-full border border-gray-200 group-hover:border-gray-300 dark:border-0 dark:bg-gray-700/50 dark:outline-0 dark:group-hover:bg-gray-700 dark:touch:active:bg-gray-700 transition-colors rounded h-fit p-2'
				>
					<option selected value='default' disabled>Selecciona una opción</option>
					{ selectOptions.map(({ text, value }) => (
						<option key={`contact-selectOption-${value}`} value={value}>{text}</option>
					)) }
				</select>
			</label>
			<label class='group'>
				<h1>Mensaje</h1>
				{/* min y max height del textarea están en css para añadir fallbacks */}
				<textarea
					id='contact-message-textarea'
					class='h-full w-full border border-gray-200 dark:border-0 dark:outline-0 dark:bg-gray-700/50 dark:group-hover:bg-gray-700 dark:touch:group-active:bg-gray-700 dark:focus-visible:bg-gray-800 rounded p-2 resize-none [scrollbar-width:thin] group-hover:border-gray-300 group-active:border-gray-300 transition-colors'
					placeholder='Escribe tu mensaje acá...'
				/>
			</label>
			<button class='flex items-center justify-center gap-4 font-semibold text-white bg-orange-500 rounded-lg h-fit w-full py-3 cursor-pointer transition-colors hover:bg-orange-600 active:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-600/80 dark:touch:active:bg-orange-600/80'>
				<Icon class='size-5'>
					<IconSend />
				</Icon>
				<span>Enviar mensaje</span>
			</button>
		</form>
  )
}
