function LoadingMessage({ message = 'Loading...' }) {
return (
<div className="rounded-lg border bg-white p-4 text-sm text-gray-600 shadowsm">
{message}
</div>
);
}
export default LoadingMessage;
