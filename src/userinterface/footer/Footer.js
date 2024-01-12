import React from "react";
import { Grid,Button } from "@mui/material";
import Logo from "../logo/Logo";
import { useStyles } from "./FooterCss";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CopyrightIcon from '@mui/icons-material/Copyright';
import {useMediaQuery} from "@mui/material";
import { useTheme } from "@mui/material/styles";


export default function Footer(){
    const theme = useTheme()
    const sm = useMediaQuery(theme.breakpoints.down("sm"));
    const md = useMediaQuery(theme.breakpoints.down("md"));
    const classes = useStyles()
    return(
        <div className={classes.main_container}>
            <Grid container spacing={2}>
                <Grid item xs={sm?12:md?5:3}>
                    <div className={classes.links}>
                    <div className={classes.logo}><Logo class_name={"footer__logo"}/></div>
                    <div className={classes.social_media}><InstagramIcon fontSize="large" varient="outlined" color="disabled"/><TwitterIcon fontSize="large" varient="outlined" color="disabled"/><FacebookIcon fontSize="large" color="disabled"/><LinkedInIcon fontSize="large" color="disabled"/></div>
                    <div className={classes.copy_right}><CopyrightIcon fontSize="small" color="disabled" /><div className={classes.copyright_text}>Black Technologies Private Limited</div></div>
                    </div>
                </Grid>
                <Grid item xs={sm?6:md?3:3}>
                    <div className={classes.links_text}>
                        <a href="#" className={classes.links_text_a}>Home</a>
                        <a href="#" className={classes.links_text_a}>Delivery Areas</a>
                        <a href="#" className={classes.links_text_a}>Career</a>
                        <a href="#" className={classes.links_text_a}>Customer Support</a>
                        <a href="#" className={classes.links_text_a}>Press</a>
                    </div>
                </Grid>
                <Grid item xs={sm?6:md?4:3}>
                    <div className={classes.links_text}>
                        <a href="#" className={classes.links_text_a}>Privacy Policy</a>
                        <a href="#" className={classes.links_text_a}>Terms of Use</a>
                        <a href="#" className={classes.links_text_a}>Responsible Discloser Policy</a>   
                    </div>
                    </Grid>
                <Grid item xs={sm?12:md?4:3}>
                    <div className={classes.app}>
                        <div className={classes.app_text}>Download App</div>
                        <div className={classes.app_button}><img src="../../assets/playstorelogo.png" height="36%" width="8%"/> <a href="#" className={classes.app_a}>Get it on play store</a></div>
                        <div className={classes.app_button}><img src="../../assets/applelogo.png" height="48%" width="14%"/><a href="#" className={classes.app_a}>Get it on apple store</a></div>
                    </div>
                </Grid>
            </Grid>

        </div>
    )
}