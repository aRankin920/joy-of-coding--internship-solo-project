import { useEffect, useState } from "react";

export default function Page() {
    const [reload, setReload] = useState(false);

    useEffect(() => {
    if (!reload) {
        setReload(true);
        window.location.reload();
    }
    }, [reload]);

    return ( <> Refreshing... </>);
}