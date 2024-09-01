import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [datasets, setDatasets] = useState([]);
    const [formatFilter, setFormatFilter] = useState('all');

    useEffect(() => {
        // Fetch the metadata from the Flask API with the current format filter
        axios.get(`http://localhost:5000/api/metadata?format=${formatFilter}`)
            .then(response => {
                console.log(response.data);  // Log the data to verify
                setDatasets(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the metadata!", error);
            });
    }, [formatFilter]);  // Add formatFilter as a dependency

    const handleFormatChange = (event) => {
        setFormatFilter(event.target.value);
    };

    return (
        <div className="dashboard-container">
            <Typography variant="h4" className="dashboard-title">
                Datasets
            </Typography>

            {/* Sort By Format Dropdown */}
            <div className="dashboard-sortby-container">
                <Typography variant="h6">Sort By:</Typography>
                <Select
                    value={formatFilter}
                    onChange={handleFormatChange}
                    className="dashboard-sortby-select"
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="csv">.csv</MenuItem>
                    <MenuItem value="xml">.xml</MenuItem>
                    <MenuItem value="json">.json</MenuItem>
                    <MenuItem value="docx">.docx</MenuItem>
                </Select>
            </div>

            <TableContainer component={Paper} className="dashboard-table-container">
                <Table>
                    <TableHead>
                        <TableRow className="dashboard-table-header">
                            <TableCell >Name</TableCell>
                            <TableCell  align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datasets.map((dataset) => (
                            <TableRow key={dataset.dataset_name}>
                                <TableCell component="th" scope="row">
                                    {dataset.dataset_name}
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" className="view-button">
                                        View
                                    </Button>
                                    <Button variant="contained" color="secondary" className="dashboard-button">
                                        Download
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Dashboard;
