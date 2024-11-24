import useSWRMutation from 'swr/mutation';


const usePostOrPut = (
    url: string,
    method: 'PUT' | 'POST',
    successMsg: string | null,
    successFunc : () => void
) => {
    // تعریف تابع ارسال درخواست
    const sendRequest = async (url: string, { arg }: { arg: any }) => {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(arg),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Request failed');
        }

        return response.json();
    };

    // استفاده از SWR برای مدیریت ارسال درخواست
    const { trigger, data, error, isMutating } = useSWRMutation(url, sendRequest);

    // تابعی برای ارسال داده‌ها و مدیریت پیام موفقیت
    const mutate = async (data: any) => {
        try {
            await trigger(data);
            if(successMsg){
                console.log(successMsg);
            }
            if(successFunc){
                successFunc()
            }
        } catch (err: any) {
            console.log(err.message || 'Something went wrong');
        }
    };

    return { mutate, data, error, isMutating };
};

export default usePostOrPut;
