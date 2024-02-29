import { reactive } from "vue"
import Modal from "./Modal.vue"

const
    _current = reactive({
        name: "",
        resolve: null,
        reject: null
    }),
    api = {
        // текущее окно
        active() {
            return _current.name;
        },
        // открыть окно
        show(name) {
            _current.name = name;
            return new Promise((resolve = () => { }, reject = () => { }) => {
                _current.resolve = resolve;
                _current.reject = reject;
            })
        },
        // принять действие окна
        accept() {
            _current.resolve();
            _current.name = ""
        },
        // отменить действие окна
        cancel() {
            _current.reject();
            _current.name = "";
        }
    },
    // регистрация компонента и предоставление объекта для управления окном через иньекцию
    plugin = {
        install(App) {
            App.component("Modal", Modal);
            App.provide("$modals", api)
        }
    }

export default plugin;