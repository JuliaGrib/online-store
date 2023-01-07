export function bootstrap(module: { start: () => void; }){
    module.start()
}