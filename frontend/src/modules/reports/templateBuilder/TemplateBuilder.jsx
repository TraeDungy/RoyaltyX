import { useState } from 'react';
import { Box, TextField, MenuItem, Button, Typography } from '@mui/material';

const fonts = [
  { label: 'Roboto', value: 'Roboto, sans-serif' },
  { label: 'Inter', value: 'Inter, sans-serif' },
];

const sampleProducts = [
  { title: 'Sample Product 1', total_royalty: 100, total_impressions: 500, impressions_revenue: 50 },
  { title: 'Sample Product 2', total_royalty: 200, total_impressions: 700, impressions_revenue: 70 },
];

export default function TemplateBuilder() {
  const [colors, setColors] = useState({ text: '#000000', heading: '#000000', header_bg: '#ffffff' });
  const [typography, setTypography] = useState({ font_family: 'Roboto, sans-serif', font_size: '11pt' });
  const [logo, setLogo] = useState(null);

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setColors((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ display: 'flex', gap: 4, p: 2 }}>
      <Box component="form" sx={{ minWidth: 300 }}>
        <Typography variant="h4" mb={2}>Template Builder</Typography>
        <TextField type="color" label="Text Color" name="text" value={colors.text} onChange={handleColorChange} fullWidth margin="normal" />
        <TextField type="color" label="Heading Color" name="heading" value={colors.heading} onChange={handleColorChange} fullWidth margin="normal" />
        <TextField type="color" label="Header BG" name="header_bg" value={colors.header_bg} onChange={handleColorChange} fullWidth margin="normal" />

        <TextField select label="Font" value={typography.font_family} onChange={(e)=>setTypography(prev=>({...prev,font_family:e.target.value}))} fullWidth margin="normal">
          {fonts.map(f => (
            <MenuItem key={f.value} value={f.value}>{f.label}</MenuItem>
          ))}
        </TextField>
        <TextField label="Font Size" value={typography.font_size} onChange={(e)=>setTypography(prev=>({...prev,font_size:e.target.value}))} fullWidth margin="normal" />
        <Button variant="outlined" component="label" sx={{ mt:2 }}>
          Upload Logo
          <input hidden type="file" onChange={e=>setLogo(e.target.files[0])} />
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, border: '1px solid #ccc', p: 2 }}>
        <div style={{
          fontFamily: typography.font_family,
          fontSize: typography.font_size,
          color: colors.text,
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', backgroundColor: colors.header_bg }}>
            {logo ? <img src={URL.createObjectURL(logo)} alt="logo" style={{ maxWidth:'150px', height:'auto' }} /> : <div>Logo</div>}
            <div>123 Example Street</div>
          </div>
          <h2 style={{ color: colors.heading, textAlign:'center' }}>Summary Royalty Statement</h2>
          <table width="100%">
            <thead>
              <tr>
                <th align="left">Title</th>
                <th align="right">Sales Revenue</th>
                <th align="right">Impressions</th>
                <th align="right">Impressions Revenue</th>
              </tr>
            </thead>
            <tbody>
              {sampleProducts.map((p,i)=>(
                <tr key={i}>
                  <td>{p.title}</td>
                  <td align="right">${p.total_royalty}</td>
                  <td align="right">{p.total_impressions}</td>
                  <td align="right">${p.impressions_revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    </Box>
  );
}
