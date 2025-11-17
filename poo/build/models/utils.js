import PromptSync from "prompt-sync";
const input = PromptSync();
export function limparTela() {
    process.stdout.write('\x1Bc');
}
export function limparTelaEnter() {
    input("");
    process.stdout.write('\x1Bc');
}
//# sourceMappingURL=utils.js.map