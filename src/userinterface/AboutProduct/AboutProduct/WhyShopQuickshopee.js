import React from "react";


export default function WhyShopQuickshopee() {
    var features = [
        { id: '1', name: 'Superfast Delivery', details: 'Get your order delivered to your doorstep at the earliest from dark stores near you.', },
        { id: '2', name: 'Best Prices & Offers', details: 'Best price destination with offers directly from the manufacturers.', },
        { id: '3', name: 'Wide Assortment', details: 'Choose from 5000+ products across food, personal care, household & other categories.', },
    ]

    const showDetails = () => {
        return features.map((item) => {
            return (
                <div>
                    <div style={{ display: 'flex', width: '85%', padding: 10, fontFamily: 'Poppins', }}>
                        

                        <div style={{ marginLeft: 10 }}>
                            <div style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {item.name}
                            </div>

                            <div style={{ fontSize: 12, }} >
                                {item.details}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div style={{ width: '98%',marginTop:'3%' }}>
            <div style={{ display: 'flex', width: '90%', padding: 5, fontFamily: 'Poppins', fontWeight: 'bold', fontSize: 18 }} >
                Why shop from quickshopee?
            </div>
            <div>
                {showDetails()}
            </div>
        </div>
    )
}