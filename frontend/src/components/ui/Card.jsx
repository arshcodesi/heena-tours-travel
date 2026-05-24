export default function Card({ className = "", children }) {
    return (
      <div
        className={[
          "rounded-2xl border border-white/60 bg-white/80 shadow-soft backdrop-blur",
          "transition duration-300",
          className
        ].join(" ")}
      >
        {children}
      </div>
    );
  }