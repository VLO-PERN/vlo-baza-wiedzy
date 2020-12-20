import { useState, useEffect } from 'react';

export const useCategory = () => {
    const [categories, setCategories]: any = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch('/api/v1/category').then(res => res.json())
            .then(data => {
                setCategories(data.categories);
                setIsLoading(false);
            }).catch(err => { 
                console.error(err);
                alert('Ups! Coś poszło nie tak ...');
            });
    }, []);
    return [categories, isLoading];
}