<script>
    import { Input, Label, Button } from "flowbite-svelte";
    import { appStatusInfo, setAppStatusError } from "../store";
    const { url, pages, id } = $appStatusInfo;

    let answer = "";
    let loading = false;

    const numOfImagesToshow = Math.min(pages, 4);
    const images = Array.from({ length: numOfImagesToshow }, (_, i) => {
        const page = i + 1;
        return url
            .replace(`/updload/', '/upload/w_400, h_540, c_fill, pg_${page}`)
            .replace(".pdf", ".jpg");
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const question = event.target.question.value;

        loading = true;
        const searchParams = new URLSearchParams();

        // const apiURL = `/api/ask`;
        searchParams.append("id", id);
        searchParams.append("question", question);

        try {
            const res = fetch(`/api/ask?${searchParams}`, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!res.ok) {
                loading = false;
                return alert("Error al enviar la pregunta");
            }
            const { response } = await res.json();
            console.log(response)
        } catch (error) {
            setAppStatusError();    
        } finally {
            loading = false;
        }
    };
</script>

<div class="grid grid-cols-4 gap-1">
    {#each images as image}
        <img src={image} class="w-full h-auto rounded" alt="PDF page" />
    {/each}
</div>

<form on:submit={handleSubmit}>
    <div>
        <Label for="first_name" class="mb-2">Deja aqui tu pregunta</Label>
        <Input
            id="question"
            placeholder="De que se trata este documento?"
            required
        />
    </div>
</form>

{#if loading}
    <div class="flex justify-center items-center">
        <div
            class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"
        ></div>
    </div>
{/if}

{#if answer}
    <div class="mt-4">
        <h2 class="text-xl font-bold">Respuesta</h2>
        <p>{answer}</p>
    </div>
{/if}
