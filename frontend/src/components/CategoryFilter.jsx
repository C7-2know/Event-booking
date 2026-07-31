const categories = ["All", "Music", "Technology", "Community", "Business", "Education", "Health", "Outdoor"];

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="flex gap-2 mt-6 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-md text-sm border ${
            selected === cat
              ? "bg-green-700 border-emerald-700 text-emerald-800"
              : "border-gray-200 text-gray-600 hover:bg-green-600"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}