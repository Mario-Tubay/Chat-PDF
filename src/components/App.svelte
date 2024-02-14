<script>
    import { Alert } from "flowbite-svelte";
    import { APP_STATUS, appStatus } from "../store.ts";
    import StepChat from "./StepChat.svelte";
    import StepUpload from "./StepUpload.svelte";
    import StepLoading from "./StepLoading.svelte";
</script>

{#if $appStatus === APP_STATUS.INIT}
    <StepUpload />
{:else if $appStatus === APP_STATUS.LOADING}
    <StepLoading />
{:else if $appStatus === APP_STATUS.ERROR}
    <Alert>
        <span class="font-medium">Algo malo ha pasado!</span>
        Hay un error e la aplicacion
    </Alert>
{:else if $appStatus === APP_STATUS.CHAT_MODE}
    <StepChat />
{:else}
    <Alert>
        <span class="font-medium">Accion no reconocida!</span>
        Este estado de la aplicacion no esta reconocida
    </Alert>
{/if}
