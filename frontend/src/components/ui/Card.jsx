function Card({ title, children }) {
  return (
    <section className="rounded-2xl border-2 border-gray-300 bg-white p-6 shadow-md">
      {title && (
        <h2
          style={{
            color: "#000000",
            fontSize: "24px",
            fontWeight: "700",
            borderBottom: "2px solid #d1d5db",
            paddingBottom: "12px",
            marginBottom: "20px",
          }}
        >
          {title}
        </h2>
      )}

      {children}
    </section>
  );
}

export default Card;