export default function InputField({ label, name, type = "text", placeholder, value, onChange }) {
    return (
        <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-600">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder={placeholder}
            />
        </div>
    )
}
