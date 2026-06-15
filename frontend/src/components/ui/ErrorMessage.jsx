function ErrorMessage({ message = 'Something went wrong.' }) {
   return (
    <div
      role="alert"
      className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm textred-700"
    >
    {message}
   </div>
);
}
export default ErrorMessage;