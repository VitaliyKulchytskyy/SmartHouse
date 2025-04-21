export default function Background({ children }) {
    return (
        <div className="bg-gradient-to-br from-violet-600 via-cyan-200">
            {children}
        </div>
    );
}
