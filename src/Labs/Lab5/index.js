import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
const app = express();
app.use(express.json());
Lab5(app);
Hello(app);
