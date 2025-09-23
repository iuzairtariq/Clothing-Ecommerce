import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const currency = 'Rs'
    const deliveryFee = 50
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const placeholderCount = 10

    const [displayProducts, setDisplayProducts] = useState(
        Array.from({ length: placeholderCount }).map(() => null)
    )

    const navigate = useNavigate()

    const addToCart = async (itemId, size) => {
        if (!size) {
            return null;
        }

        let cartData = structuredClone(cartItems);

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
        } else {
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        toast.success('Added to cart')

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error);
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity

        setCartItems(cartData)
        toast.info('Product updated')

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const getProductData = async () => {
        try {
            setIsLoading(true)
            // Show skeleton during loading
            setDisplayProducts(Array.from({ length: placeholderCount }).map(() => null))

            // Simulate loading delay (remove this in production if not needed)
            await new Promise(resolve => setTimeout(resolve, 1000))

            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success && Array.isArray(response.data.products)) {
                setProducts(response.data.products)
                setDisplayProducts(response.data.products)
            } else {
                toast.error(response.data.message || 'Failed to fetch products')
                setProducts([])
                setDisplayProducts([])
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message || 'Failed to fetch products')
            setProducts([])
            setDisplayProducts([])
        } finally {
            setIsLoading(false)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    // Filter products based on search
    const filterProducts = (searchTerm) => {
        if (!searchTerm || !searchTerm.trim()) {
            setDisplayProducts(products)
            return
        }

        const term = searchTerm.trim().toLowerCase()
        const filtered = products.filter(product => {
            const name = (product.name || '').toLowerCase()
            const description = (product.description || '').toLowerCase()
            const category = (product.category || '').toLowerCase()

            return name.includes(term) ||
                description.includes(term) ||
                category.includes(term)
        })

        setDisplayProducts(filtered)
    }

    const value = {
        products,
        currency,
        deliveryFee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        backendUrl,
        token,
        setToken,
        navigate,
        displayProducts,
        isLoading,
        filterProducts
    }

    useEffect(() => {
        getProductData()
    }, [])

    useEffect(() => {
        if (!isLoading) {
            filterProducts(search)
        }
    }, [search, products, isLoading])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, []);

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;