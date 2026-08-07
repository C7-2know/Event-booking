export default function SectionHeading({eyebrow, title, action}) {
    return (
        <div className="mb-8 flex items-end justify-between gap-4"><div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-.055em] md:text-4xl">{title}</h2>
        </div>{action}</div>
    )   
}
