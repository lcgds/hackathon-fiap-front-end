export interface EntryResponse {
    id: number;
    cpf: string;
    agency: string;
    account: string;
    entry_name: string;
    entry_type: string;
    value: number;
    entry_ts: string;
    category: string;
}

export const entryService = {
  getEntries: async (): Promise<EntryResponse[]> => {
    try {
        const params = new URLSearchParams({
            agency: process.env.NEXT_PUBLIC_AGENCY || '0001',
            account: process.env.NEXT_PUBLIC_ACCOUNT || '123456',
        });

        const urlGet = `${process.env.NEXT_PUBLIC_ACCOUNT_ENTRIES_SERVICE_URL}/account-entries?${params}`;

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
  getEntryId: async (id: number): Promise<EntryResponse> => {
    try {

        const urlGet = `${process.env.NEXT_PUBLIC_ACCOUNT_ENTRIES_SERVICE_URL}/account-entries/${id}`;

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
        return
    }
  },
  updateEntryCategory: async (id: number, category: string, entry_name: string, agency: string, account: string): Promise<EntryResponse> => {
    try {

        const urlPatchEntry = `${process.env.NEXT_PUBLIC_ACCOUNT_ENTRIES_SERVICE_URL}/account-entries/${id}/category`;
        const urlPostRule = `${process.env.NEXT_PUBLIC_CLASSIFIER_SERVICE_URL}/rules`;

        const response = await fetch(urlPatchEntry, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({category: category}),
            cache: 'no-store', 
        });

        await fetch(urlPostRule, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({agency: agency, account: account, entry_name_pattern: entry_name, category: category}),
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
        return
    }
  },
  registerEntry: async (cpf: string, category: string, entry_name: string, entry_type:string, value: number, rawAgency: string, rawAccount: string): Promise<EntryResponse> => {
    try {

        const urlPostEntry = `${process.env.NEXT_PUBLIC_ACCOUNT_ENTRIES_SERVICE_URL}/account-entries`;
        const urlPostRule = `${process.env.NEXT_PUBLIC_CLASSIFIER_SERVICE_URL}/rules`;

        const agency = (rawAgency && rawAgency !== 'null') ? rawAgency : process.env.NEXT_PUBLIC_AGENCY
        const account = (rawAccount && rawAccount !== 'null') ? rawAccount : process.env.NEXT_PUBLIC_ACCOUNT

        const payload = {
            cpf: cpf,
            agency: agency,
            account: account,
            entry_name: entry_name,
            value: value,
            entry_type: entry_type
        }

        const response = await fetch(urlPostEntry, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            cache: 'no-store', 
        });

        if (category && category !== '') {
            await fetch(urlPostRule, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({agency: agency, account: account, entry_name_pattern: entry_name, category: category}),
                cache: 'no-store', 
            });   
        }

        if (!response.ok) {
            const errorDetail = await response.text();
            console.error(`Error (${response.status}):`, errorDetail);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return
    }
  },
};