export default function GradientHorizontal({ children, className = "" }) {
    return (
        <div
            className={
                "h-full w-full bg-linear-to-r from-violet-600 via-cyan-200 to-blue-400" +
                className
            }
        >
            {children}
        </div>
    );
}