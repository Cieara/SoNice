export const getLandingPageProducts = async () => {
    try {
        let response = await fetch(`productshop`);
        console.log(response);
        let data = await response.json();
        return data;
    }
    catch (error) {
        return -2;
    }
}

export const getProducts = async () => {
    try {
        let response = await fetch(`productshop`);

        let data = await response.json();
        return data;
    }
    catch (error) {
        return -2;
    }
}

export const getProductsWithCategories = async () => {
    try {
        let response = await fetch(`productshop/categories`);

        let data = await response.json();
        return data;
    }
    catch (error) {
        return -2;
    }
}

export const getProductById = async (Id) => {
    try {
        let response = await fetch(`productshop/${Id}`);
        console.log(response);
        let data = await response.json();
        return data;
    }
    catch (error) {
        return -2;
    }
}