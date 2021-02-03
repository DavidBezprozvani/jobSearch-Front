import React, {useEffect, useState} from 'react';
import {
    Divider,
    List,
    ListItemAvatar,
    makeStyles,
    ListItem,
    ListItemText,
    Avatar,
    Button, Collapse
} from "@material-ui/core";
import {fetchAllUsers} from "../../api/usersApi";
import Loader from "../../common/Loader";


const useStyles = makeStyles(() => ({

    listItems: {
        // display: "flex",
    },

    button: {
        background: "white",
        color: "#3d69be",
        fontSize: "10px",
        borderRadius: "10px",
        border: "0.1px",
        borderStyle: "solid",
        paddingLeft: "8px",
        paddingRight: "8px",
        '&:hover': {
            opacity: "0.9",
            background: "white",
        }
    }

}));


const UserList = () => {

    const classes = useStyles();
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [open, setOpen] = useState([])

    useEffect(() => {
        loadAllUsers();
    }, [])


    const loadAllUsers = () => {
        setIsLoading(true);
        fetchAllUsers().then(response => {
            setUsers(response.data)
            console.log(users)
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
                    <List>
                        {
                            users.map(user => (
                                    <>
                                        <ListItem className={classes.listItems}>
                                                <ListItemAvatar>
                                                    <Avatar alt={user.username} src={user.profilePictureUrl}/>
                                                </ListItemAvatar>
                                                <ListItemText>

                                                    <p variant="h8">Username: {user.username}</p>
                                                        <Button className={classes.button}
                                                                onClick={() => {
                                                                    if (open.includes(user.username)) {
                                                                        setOpen(open.filter(id => id !== user.username))
                                                                    } else {
                                                                        setOpen([...open, user.username])
                                                                    }
                                                                }}
                                                        >
                                                            {open.includes(user.username) ? 'Hide Details' : 'View Details'}
                                                        </Button>
                                                        <Collapse in={open.includes(user.username)}>
                                                            <p variant="h8">Name: {user.name}</p>
                                                            <p variant="h8">Surname: {user.surname}</p>
                                                            <p variant="h8">Email:{user.email}</p>
                                                        </Collapse>
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

export default UserList