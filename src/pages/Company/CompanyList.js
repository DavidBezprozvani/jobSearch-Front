import React, {useEffect, useState} from 'react';
import {
    List,
    makeStyles,
    ListItem,
    Container, Button,
} from "@material-ui/core";
import Loader from "../../common/Loader";
import {fetchAllCompanies} from "../../api/companyApi";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";


const useStyles = makeStyles(() => ({

    wrapper: {
        marginTop: "130px",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
    },

    list: {
        width: "100%",
        height: "100%",
        marginTop: "25px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
    },

    listItems: {
        width: "33%",
        height: "33%",
        padding: "30px",
        display: "flex",
        marginTop: "50px",
        justifyContent: "center",
        alignItems: "center",
    },

    companyLogo: {
        width: "300px",
        height: "300px",
        borderRadius: "10px",
        marginRight: "30px",
    },

    button: {
        background: "#3d69be",
        margin: "10px 0",
        color: "white",
        fontSize: "20px",
        textDecoration: "none",
        borderRadius: "15px",
        borderStyle: "solid",
        paddingLeft: "15px",
        paddingRight: "15px",
        '&:hover': {
            opacity: "0.9",
            background: "#3d69be",
        }
    },

    link: {
        textDecoration: "none",
    },

}));


const CompanyList = () => {

    const classes = useStyles();
    const [companies, setCompanies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { t } = useTranslation('companies')


    useEffect(() => {
        loadAllCompanies();
    }, [])



    const loadAllCompanies = () => {
        setIsLoading(true);
        fetchAllCompanies().then(response => {
            setCompanies(response.data)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    // TODO: add remove user button, add avatars to DB

    return (

        <>

            {
                isLoading ?
                    <Loader/>
                    :

                    <Container className={classes.wrapper}>
                        <Link to="/companies/new" className={classes.link}>
                            <Button type="button" className={classes.button}>
                               {t ('join')}
                            </Button>
                        </Link>
                        <List className={classes.list}>
                            {
                                companies.map(company => (
                                        <>
                                            <div className={classes.listItems} key={company.id}>
                                                <ListItem>
                                                        <img alt="logo" className={classes.companyLogo} src={company.logoUrl}/>
                                                </ListItem>
                                            </div>
                                        </>
                                    )
                                )
                            }
                        </List>
                    </Container>
            }
        </>
    )
}

export default CompanyList