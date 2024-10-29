
const registrarUsuario = () => {
    const { handleSubmit, register, reset } = useForm();

    const { mutate } = useMutation({
        mutationFn: createUser,
        onError: (err) => {
            toast(err.message);

        },
        onSuccess: (data) => {
            if (!data.success) {
                toast.error(data.message);
            } else {
                toast.success(data.message);
                reset();
            }
        }
    });

    const onSubmit = (data) => mutate(data);
}


