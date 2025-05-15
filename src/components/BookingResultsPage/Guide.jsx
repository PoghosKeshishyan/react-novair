import './Guide.css';

export function Guide({ guide_label }) {
    return (
        <div className="Guide">
            <span>{guide_label.split('/')[0]}</span>
            <img src="/images/left-arrow.svg" alt="arrow" />
            {guide_label.split('/')[1]}
        </div>
    )
}
