export function FloatingInput({
  id,
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = " ",
  required = false,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  step?: string;
}) {
  return (
    <div className="relative z-0 w-full group">
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="block py-3.5 px-4 w-full text-white bg-zinc-900 rounded-lg border border-amber-500/40
          appearance-none focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-80
          peer
          placeholder-transparent
          transition duration-300 ease-in-out
          hover:shadow-[0_6px_15px_rgb(255_191_0_/_0.2)]
          text-base"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-3 text-white text-base font-semibold
          transition-all duration-300 ease-in-out
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-white/70 peer-placeholder-shown:text-base
          peer-focus:top-0 peer-focus:text-amber-400 peer-focus:text-sm"
      >
        {label}
      </label>
    </div>
  );
}

export function FloatingTextarea({
  id,
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
}: {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div className="relative z-0 w-full group">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="block py-4 px-4 w-full text-white bg-zinc-900 rounded-lg border border-amber-500/30
          appearance-none focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-80
          peer
          placeholder-transparent
          transition duration-300 ease-in-out
          hover:shadow-[0_6px_15px_rgb(255_191_0_/_0.2)]
          resize-vertical
          scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-zinc-800 scrollbar-thumb-rounded-full"
      />
      <label
        htmlFor={id}
        className="absolute text-white text-sm left-4 top-4
          transition-all duration-300 ease-in-out
          peer-placeholder-shown:top-6 peer-placeholder-shown:text-white/70 peer-placeholder-shown:text-base
          peer-focus:top-1 peer-focus:text-amber-400 peer-focus:text-sm font-semibold"
      >
        {label}
      </label>
    </div>
  );
}

export function FloatingSelect({
  id,
  label,
  name,
  value,
  onChange,
  required = false,
  options,
}: {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  required?: boolean;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative z-0 w-full group">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="block py-4 px-4 w-full text-white bg-zinc-900 rounded-lg border border-amber-500/30
          appearance-none focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-80
          peer
          cursor-pointer
          transition duration-300 ease-in-out
          hover:shadow-[0_6px_15px_rgb(255_191_0_/_0.2)]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-black">
            {opt.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className="absolute text-white text-sm left-4 top-4 transition-all duration-300 ease-in-out peer-placeholder-shown:top-6 peer-placeholder-shown:text-white/70 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-amber-400 peer-focus:text-sm font-semibold"
      >
        {label}
      </label>
    </div>
  );
}
