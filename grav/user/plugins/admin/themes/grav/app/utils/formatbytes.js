const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export default function formatBytes(bytes, decimals) {
    if (bytes === 0) return '0 Byte';

    let k = 1000;
    let value = Math.floor(Math.log(bytes) / Math.log(k));
    let decimal = decimals + 1 || 3;

    return (bytes / Math.pow(k, value)).toPrecision(decimal) + ' ' + sizes[value];
}
