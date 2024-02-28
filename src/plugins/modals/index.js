import { reactive } from "vue"
import Modal from "./Modal.vue"

const
    _current = reactive({
        name: "",
        resolve: null,
        reject: null
    }),
    api = {
        active() {
            return _current.name;
        },
        show(name) {
            _current.name = name;
            return new Promise((resolve = () => { }, reject = () => { }) => {
                _current.resolve = resolve;
                _current.reject = reject;
            })
        },
        accept() {
            _current.resolve();
            _current.name = ""
        },
        cancel() {
            _current.reject();
            _current.name = "";
        }
    },
    plugin = {
        install(App) {
            App.component("Modal", Modal);
            App.provide("$modals", api)
        }
    }

export default plugin;