import React, {useEffect, useState} from 'react';
import {
    Divider,
    List,
    ListItemAvatar,
    makeStyles,
    ListItem,
    ListItemText,
    Typography,
} from "@material-ui/core";
import Loader from "../../common/Loader";
import {fetchAllCompanies} from "../../api/companyApi";


const useStyles = makeStyles(() => ({

    companyLogo: {
        width: "100px",
        height: "100px",
        borderRadius: "10px",
        marginRight: "30px",
    },

}));


const CompanyList = () => {

    const classes = useStyles();
    const [companies, setCompanies] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadAllCompanies();
    }, [])


    const loadAllCompanies = () => {
        setIsLoading(true);
        fetchAllCompanies().then(response => {
            setCompanies(response.data)
            console.log(companies)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    // TODO: add remove user button, add avatars to DB

    return (

        <>
            <Typography variant="h3"> Our Partners: </Typography>
            {
                isLoading ?
                    <Loader/>
                    :

                    <List>
                        {
                            companies.map(company => (
                                    <>
                                        <ListItem className={classes.listItems}>
                                            <ListItemAvatar>
                                                <img className={classes.companyLogo} src={company.logoUrl}/>
                                            </ListItemAvatar>
                                            <ListItemText>
                                                <Typography variant="h4">{company.companyName}</Typography>
                                                <p>{company.address}</p>

                                            </ListItemText>
                                        </ListItem>
                                        <Divider variant="inset" component="li"/>
                                    </>
                                )
                            )
                        }
                    </List>
            }
        </>
    )
}

export default CompanyList