import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from '@mui/material';

const formatArgument = (arg) => {
  if (!arg) return '';
  const { name, type, description } = arg;
  return description ? `${name}: ${type} — ${description}` : `${name}: ${type}`;
};

const formatReturn = (ret) => {
  if (!ret) return 'None';
  const { name, type, description } = ret;
  return description ? `${name}: ${type} — ${description}` : `${name}: ${type}`;
};

export default function ProtocolTable({ data }) {
  const { general, commands } = data;

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom sx={{ padding: 2 }}>
        Command List – {general?.name || 'Unknown'}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Arguments</strong></TableCell>
            <TableCell><strong>Returns</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commands?.map((cmd) => (
            <TableRow key={cmd.name}>
              <TableCell>{cmd.name}</TableCell>
              <TableCell>
                {cmd.arguments?.length > 0
                  ? cmd.arguments.map(formatArgument).join(', ')
                  : 'None'}
              </TableCell>
              <TableCell>{cmd.return ? formatReturn(cmd.return) : 'None'}</TableCell>
              <TableCell>{cmd.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
