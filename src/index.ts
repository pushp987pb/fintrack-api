import express from "express";
import transactionRoutes from "./transactions/transaction.routes";
import expenseRoutes from "./expenses/expense.routes";

const app = express();
app.use(express.json());

app.use("/transactions", transactionRoutes);
app.use("/expenses", expenseRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
