export default function EmptyState({title,text}) {
    return 
    <div className="border border-dashed border-line bg-white px-6 py-14 text-center">
        <h3 className="font-bold">{title}</h3>
        <p className="mt-2 text-sm text-muted">{text}</p>
    </div>
}
