// Animation time
const TIME_FAST = 200
const TIME_DEFAULT = 300
const TIME_SLOW = 800
const TIME_MEDIUM = 500
const TIME_INTERVAL_CHART = 1500

// Configurações

// const VERSION_URL = "version/" + VERSION_NUMBER + "/"

const isCloud = () => {
   return window.location.href.includes("www.allinsys.com")
}

const getLoginURL = () => {
   if (window.location.href.indexOf("allinsys.com") > -1) {
      url = "https://www.allinsys.com/login"
   } else {
      url = "https://localhost/allinsys/login"
   }
   return url
}

// const getDefaultURL = () => {
//    if (window.location.href.indexOf("allinsys.com") > -1) {
//       url = "https://www.allinsys.com/system/" + VERSION_URL
//    } else {
//       url = "https://localhost/allinsys/system/" + VERSION_URL
//    }
//    return url
// }

// const DEFAULT_LOGIN_URL = getLoginURL()
// const DEFAULT_URL = getDefaultURL()
// const DEFAULT_ASSETS_URL = url + "assets/"
// const DEFAULT_ERROR_LOG = DEFAULT_URL + "php/global/error-receiver.php"
// const DEFAULT_LOG = false
// const DEFAULT_MODAL_MENU_WIDTH = 400
// const DEFAULT_FORM_ACTION_INSERT = "form_insert"
// const DEFAULT_FORM_ACTION_UPDATE = "form_update"
// const DEFAULT_MODULE_LOADER_URL = DEFAULT_URL + "php/global/module-loader.php"
// const DEFAULT_GET_FORM_URL = DEFAULT_URL + "php/global/get-form.php"
// const DEFAULT_FORM_URL = DEFAULT_URL + "php/global/form.php"
// const DEFAULT_FORM_INSERT_URL = DEFAULT_URL + "php/global/form-insert.php"
// const DEFAULT_FORM_UPDATE_URL = DEFAULT_URL + "php/global/form-update.php"
// const DEFAULT_FILE_HANDLER_URL = DEFAULT_URL + "php/global/file-handler-call.php"
// const DEFAULT_UPLOAD_HANDLER_URL = DEFAULT_URL + "php/global/upload-handler.php"
// const DEFAULT_CHART_HANDLER_URL = DEFAULT_URL + "php/global/chart-handler.php"
// const DEFAULT_DASHBOARD_HANDLER_URL = DEFAULT_URL + "php/global/dashboard-handler.php"
// const DEFAULT_TRIGGER_HANDLER_URL = DEFAULT_URL + "php/global/trigger-handler.php"
// const DEFAULT_FILTER_URL = DEFAULT_URL + "php/global/filter.php"
// const DEFAULT_QUIZ_URL = DEFAULT_URL + "php/global/quiz.php"
// const DEFAULT_GET_LIST_URL = DEFAULT_URL + "php/global/get-list.php"
// const DEFAULT_VALIDATE_HANDLER_URL = DEFAULT_URL + "php/global/validate-handler.php"
// const DEFAULT_LIST_URL = DEFAULT_URL + "php/global/list.php"
// const DEFAULT_FORM_MULTIPLE_URL = DEFAULT_URL + "php/global/form-multiple.php"
// const DEFAULT_PARTIAL_UPDATE_URL = DEFAULT_URL + "php/global/partial-update.php"
// const DEFAULT_LOGIN_HANDLER_URL = DEFAULT_URL + "php/global/login-handler.php"
// const DEFAULT_UPDATE_SHORTCUT_URL = DEFAULT_URL + "php/global/update-shortcut.php"
// const DEFAULT_EDITOR_PAGE_URL = DEFAULT_URL + "php/global/editor.php"
// const DEFAULT_CHECK_LIST_URL = DEFAULT_URL + "php/global/check-list.php"
// const DEFAULT_GET_SINGLE_MODULE = DEFAULT_URL + "php/global/get-single-module.php"
// const DEFAULT_LIST_UPDATE_URL = DEFAULT_URL + "php/global/list-update.php"
// const DEFAULT_REQUEST_URL = DEFAULT_URL + "php/global/request.php"
// const DEFAULT_SELECT_URL = DEFAULT_URL + "php/global/select.php"
// const DEFAULT_DUPLICATE_URL = DEFAULT_URL + 'php/global/duplicate.php'
// const DEFAULT_COPY_URL = DEFAULT_URL + 'php/global/copy.php'
// const DEFAULT_DELETE_URL = DEFAULT_URL + "php/global/delete.php"
// const DEFAULT_GET_FUNCTION_URL = DEFAULT_URL + "php/global/get-function.php"
// const DEFAULT_WEATHER_HANDLER_URL = DEFAULT_URL + "php/global/weather-handler.php"
// const DEFAULT_WEATHER_API_URL = DEFAULT_URL + "php/global/weather-api.php"

const DEFAULT_THEME_DEFAULT = "default"
const DEFAULT_THEME_PRIMARY = "primary"
const DEFAULT_THEME_INFO = "info"
const DEFAULT_THEME_SUCCESS = "success"
const DEFAULT_THEME_WARNING = "warning"
const DEFAULT_THEME_DANGER = "danger"
const DEFAULT_THEME_MAP = {
   df: DEFAULT_THEME_DEFAULT,
   pm: DEFAULT_THEME_PRIMARY,
   if: DEFAULT_THEME_INFO,
   sc: DEFAULT_THEME_SUCCESS,
   wn: DEFAULT_THEME_WARNING,
   dg: DEFAULT_THEME_DANGER,
}

// Tipos de dados
const DATATYPE_INT = "int"
const DATATYPE_FLOAT = "float"
const DATATYPE_BOOL = "bool"
const DATATYPE_STRING = "string"
const DATATYPE_OBJECT = "object"
const DATATYPE_CURRENCY = "currency"
const DATATYPE_MONEY = "money"
const DATATYPE_METERS = "meters"
const DATATYPE_KILOMETER = "kilometer"
const DATATYPE_COST = "cost"
const DATATYPE_UNIQUE = "unique"
const DATATYPE_TOKEN = 'token';
const DATATYPE_CONSUMPTION = "consumption"
const DATATYPE_PERCENT = "percent"
const DATATYPE_PERCENT_COST = "percent_cost"
const DATATYPE_DATE = "date"
const DATATYPE_DATETIME = "datetime"
const DATATYPE_JSON = "json"
const DATATYPE_DOCUMENT_COMPANY = "company"
const DATATYPE_DOCUMENT_PERSON = "person"
const DATATYPE_DOCUMENT = "document"
const DATATYPE_CENTIMETER = "centimeter"
const DATATYPE_COUNT = "count"

// Indetificador de criptografia
const KEY_JS = "N#Rr0IIsN@VuNPvvs9FsLc9ymFU&z2PGFE0+k=CG#YA8##X!&oM!AtWxK0*Et%AK"

// Cores
const COLORS = {
   PRIMARY: "var(--primary)",
   SECONDARY: "var(--secondary)",
   DEFAULT: "var(--default)",
   SUCCESS: "var(--success)",
   WARNING: "var(--warning)",
   DANGER: "var(--danger)",
   INFO: "var(--info)",
   GREY: "var(--grey)"
}

// Tipos de widgets
const WIDGET_ALERT = "alert"
const WIDGET_LIST = "list"
const WIDGET_DATE = "date_picker"
const WIDGET_INPUT = "input"
const WIDGET_RATING = 'rating';
const WIDGET_CHECKLIST = 'check_list';
const WIDGET_INPUT_COLOR = "input_color"
const WIDGET_INPUT_MARKER = "marker"
const WIDGET_TEXTAREA = "textarea"
const WIDGET_CHECKBOX = "checkbox"
const WIDGET_RADIO = "radio"
const WIDGET_TOGGLE = "toggle"
const WIDGET_SELECT = "select"
const WIDGET_SELECT_MULTIPLE = "select_multiple"
const WIDGET_CHIP_INPUT = "chip_input"
const WIDGET_LIST_INPUT = "list_input"
const WIDGET_LIST_INPUT_ADD = "list_input_add"
const WIDGET_EDITOR = "editor"
const WIDGET_HTML_EDITOR = "editor_html"
const WIDGET_DROPDOWN = "dropdown"
const WIDGET_BUTTON = "button"
const WIDGET_FLOAT_BUTTON = "float"
const WIDGET_FORM = "form"
const WIDGET_LINK = "link"
const WIDGET_LABEL = "label"
const WIDGET_MARKER = "marker"
const WIDGET_IMAGE = "image"
const WIDGET_IMAGE_INPUT = "image_input"
const WIDGET_IMAGE_EDITOR = "image_editor"
const WIDGET_MODAL = "modal"
const WIDGET_PROGRESS_BAR_CIRCLE = "progress_circle"
const WIDGET_PROGRESS_DIALOG = "progress_dialog"
const WIDGET_PROGRESS_TASK = "progress_task"
const WIDGET_EVENT = "event"
const WIDGET_EVENTS = "events"
const WIDGET_CONFIRM_DIALOG = "confirm_dialog"
const WIDGET_TAB = "tab"
const WIDGET_TABLE = "table"
const WIDGET_REPORT = "report"
const WIDGET_EXPORT = "export"
const WIDGET_TABLE_MENU = "table_menu"
const WIDGET_ROW_VIEW_COLLAPSE = "row_view_collapse"
const WIDGET_MODULE = "module"
const WIDGET_MODULE_SELECTION = "module_selection"
const WIDGET_WINDOW = "window"
const WIDGET_NAV_BAR = "nav_bar"
const WIDGET_EDITOR_MENU = "editor_menu"
const WIDGET_EDITOR_PAGE = "editor_page"
const WIDGET_PREVIEW_IMAGE = "preview_image"
const WIDGET_TOOLTIP = "tooltip"
const WIDGET_INPUT_RANGE_SINGLE = "input_range_single"
const WIDGET_INPUT_RANGE = "input_range"
const WIDGET_INPUT_EDITOR = "input_editor"
const WIDGET_FILTER_HANDLER = "filter_handler"
const WIDGET_IMAGE_INPUT_SINGLE = "image_input_single"
const WIDGET_PREVIEW_IMAGE_SINGLE = "preview_image_single"
const WIDGET_GROUP_HANDLER = "group_handler"
const WIDGET_QUIZ = "quiz"
const WIDGET_QUIZ_EDITOR = "quiz_editor"
const WIDGET_STEPPER = "stepper"

// Requisições via GET / POST
const REQUEST_DELETE_LIST_INPUT = "delete_list_input"

// Tipos de filtros
const FILTER_TYPE_WHERE = "where"
const FILTER_TYPE_GROUP = "group"
const FILTER_TYPE_HAVING = "having"
const FILTER_TYPE_ORDER = "order"

// Operações matemáticas
const MATH_SUM = "SUM"

// Lista de operações matemáticas
const MATH_OPERATIONS = [MATH_SUM]

// APIs
const API_JQUERY_MASK = "jqueryMask"
const API_INPUTMASK = "inputmask"
// Dir
const DIR_IMG = "img"

// Pages
// const PAGE_REPORT = DEFAULT_URL + "php/pages/report.php"
