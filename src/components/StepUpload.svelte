<script>
    import { appStatus , setAppstatusLoading, setAppStatusError, setAppStatusAppChatMode } from "../store.ts";

    import Dropzone from "svelte-file-dropzone";

    let files = {
        accepted: [],
        rejected: [],
    };

    async function handleFilesSelect(e) {
        const { acceptedFiles, fileRejections } = e.detail;
        files.accepted = [...files.accepted, ...acceptedFiles];
        files.rejected = [...files.rejected, ...fileRejections];
        if(acceptedFiles.length > 0) {
            setAppstatusLoading();

            const formdata = new FormData();
            formdata.append("file", acceptedFiles[0]);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formdata,
            });

            if(!res.ok){
                return setAppStatusError();
            }
            
            const result = await res.json();
            const { id, url, pages } = result;
            setAppStatusAppChatMode({ id, url, pages });
        }
    }
</script>

{#if files.accepted.length === 0}
<Dropzone
multiple={false} on:drop={handleFilesSelect}>
    Arrastra y suelta un archivo aqui
</Dropzone>

{/if}
<ol>
    {#each files.accepted as item}
        <li>{item.name}</li>
    {/each}
</ol>
