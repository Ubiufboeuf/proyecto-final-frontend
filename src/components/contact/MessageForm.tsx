import { Icon } from '../Icon'
import { IconSend } from '../Icons'

export function MessageForm ({ selectOptions }: { selectOptions: { text: string, value: string }[] }) {
	function handleSubmitForm () {
		
	}
		
  return (
    <form
			class='bg-white rounded-lg w-full h-fit flex-1 border border-gray-200 flex flex-col p-6 gap-6 [&_h1:not(&>h1)]:font-medium
				[&_input]:h-10 [&_input]:w-full [&_input]:group-hover:outline-gray-300 [&_input]:group-active:outline-gray-300 [&_input]:focus-visible:outline-black [&_input]:transition-colors [&_input]:outline [&_input]:outline-transparent [&_input]:border [&_input]:border-gray-200 [&_input]:rounded [&_input]:px-2
			'
			onSubmit={handleSubmitForm}
		>
			<h1 class='text-xl font-semibold'>Envíanos un Mensaje</h1>
			<div class='flex items-center justify-between w-full h-fit gap-4 md:flex-row flex-col'>
				<label class='group w-full max-w-full'>
					<h1>Nombre Completo</h1>
					<input required />
				</label>
				<label class='group w-full max-w-full'>
					<h1>Teléfono</h1>
					<input type='tel' required />
				</label>
			</div>
			<label class='group'>
				<h1>Email</h1>
				<input type='email' required />
			</label>
			<label class='group'>
				<h1>Asunto</h1>
				<select
					class='w-full border border-gray-200 group-hover:border-gray-300 transition-colors rounded h-fit p-2'
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
					class='h-full w-full border border-gray-200 rounded p-2 resize-none [scrollbar-width:thin] group-hover:border-gray-300 group-active:border-gray-300 transition-colors'
					placeholder='Escribe tu mensaje acá...'
				/>
			</label>
			<button class='flex items-center justify-center gap-4 font-semibold text-white bg-orange-500 rounded-lg h-fit w-full py-3 cursor-pointer transition-colors hover:bg-orange-600 active:bg-orange-600'>
				<Icon class='size-5'>
					<IconSend />
				</Icon>
				<span>Enviar mensaje</span>
			</button>
		</form>
  )
}
