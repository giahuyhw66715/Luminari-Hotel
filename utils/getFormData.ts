type Data = {
    [key: string]: string | number | string[];
};
export default function getFormData(data: Data) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
        formData.append(key, JSON.stringify(value));
    }
    return formData;
}
