import React from 'react';
import { Card, Typography } from '@mui/material';
import { Form } from './components/form';

const App: React.FC = () => (
    <Card sx={{ mx: 8, my: 3, width: 330, px: 10, py: 5 }}>
        <Typography variant="h5">Create a new dish</Typography>
        <Form />
    </Card>
);

export default App;
