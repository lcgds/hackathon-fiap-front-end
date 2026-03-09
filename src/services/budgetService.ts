export interface BudgetResponse {
    id: number;
    category_name: string;
    budget_amount: number;
    actual_amount: number;
}

export const budgetService = {
  getBudgetList: async (): Promise<BudgetResponse[]> => {
    try {
        const params = new URLSearchParams({
            agency: process.env.NEXT_PUBLIC_AGENCY || '0001',
            account: process.env.NEXT_PUBLIC_ACCOUNT || '123456',
        });

        const urlGet = `${process.env.NEXT_PUBLIC_BUDGET_SERVICE_URL}/budgets?${params}`;
        const urlRefresh = `${process.env.NEXT_PUBLIC_BUDGET_SERVICE_URL}/budgets/refresh?${params}`;

        await fetch(urlRefresh, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            cache: 'no-store', 
        });

        const response = await fetch(urlGet, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
            cache: 'no-store', 
        });

        if (!response.ok) {
            const errorDetail = await response.text();
            console.error(`Error (${response.status}):`, errorDetail);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error connecting to the Budget service:", error);
        return [];
    }
  },
  updateBudget: async (id: number, category_name: string, budget_amount: number): Promise<BudgetResponse> => {
    try {
    
        const urlPatch = `${process.env.NEXT_PUBLIC_BUDGET_SERVICE_URL}/budgets/${id}`;
        const payload = {
            category_name: category_name,
            budget_amount: budget_amount
        }

        const response = await fetch(urlPatch, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            cache: 'no-store', 
        });

        if (!response.ok) {
            const errorDetail = await response.text();
            console.error(`Error (${response.status}):`, errorDetail);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error connecting to the Budget service:", error);
        return [];
    }
  },
  createBudget: async (category_name: string, budget_amount: number): Promise<BudgetResponse> => {
    try {
    
        const urlPatch = `${process.env.NEXT_PUBLIC_BUDGET_SERVICE_URL}/budgets`;
        const payload = {
            agency: process.env.NEXT_PUBLIC_AGENCY || '0001',
            account: process.env.NEXT_PUBLIC_ACCOUNT || '123456',
            category_name: category_name,
            budget_amount: budget_amount
        }

        const response = await fetch(urlPatch, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            cache: 'no-store', 
        });

        if (!response.ok) {
            const errorDetail = await response.text();
            console.error(`Error (${response.status}):`, errorDetail);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error connecting to the Budget service:", error);
        return [];
    }
  },
  deleteBudget: async (id: number): Promise<BudgetResponse> => {
    try {
    
        const urlPatch = `${process.env.NEXT_PUBLIC_BUDGET_SERVICE_URL}/budgets/${id}`;

        const response = await fetch(urlPatch, {
            method: 'DELETE',
            cache: 'no-store', 
        });

        if (response.status !== 204) {
            const errorDetail = await response.text();
            console.error(`Error (${response.status}):`, errorDetail);
        }

        return;
    } catch (error) {
        console.error("Error connecting to the Budget service:", error);
        return [];
    }
  },
};