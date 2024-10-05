import * as React from "react";
import { Box, Typography, useTheme, Grid } from "@mui/material";
import { tokens } from "../../../base/theme";
import Header from "../../../components/Header";
import { useNavigate, Link  } from 'react-router-dom';

const Services = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const boxContents = [
        { title: "Courses", imageUrl: "url-to-image1.jpg", description: "Manage, add or edit the courses", link: "/services/courses" },
        { title: "Subjects", imageUrl: "url-to-image2.jpg", description: "Manage, add or edit the subjects", link: "/services/subjects" },
        { title: "Classes", imageUrl: "url-to-image3.jpg", description: "Manage, add or edit the classes", link: "/classes" },
        { title: "Lessons", imageUrl: "url-to-image4.jpg", description: "Manage, add or edit the lessons", link: "/services/subjects_lessons" },
        { title: "Calendar", imageUrl: "url-to-image5.jpg", description: "Manage, add or edit the calendar", link: "/calendar" },
        { title: "Material", imageUrl: "url-to-image6.jpg", description: "Manage, add or edit the material", link: "/services/subjects" },
    ];

    return (
        <Box>
            <Header title="Manage Services" subtitle="Choose the boxes to add/edit" />

            <Box marginLeft="1%" marginRight="1%">
            <Grid container spacing={2}>
                    {boxContents.map((content, index) => (
                        <Grid item xs={4} key={index}>
                            <Link to={content.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Box
                                    sx={{
                                        height: "30vh",
                                        border: "4px solid",
                                        borderColor: theme.palette.mode === "dark" ? colors.primary[400] : colors.primary[100],
                                        backgroundImage: `url(${content.imageUrl})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        padding: "1rem",
                                    }}
                                >
                                    <Typography variant="h5">{content.title}</Typography>
                                    <Typography variant="body1">{content.description}</Typography>
                                </Box>
                            </Link>
                        </Grid>
                    ))}
                </Grid>

            </Box>
        </Box>
    );
};

export default Services;


