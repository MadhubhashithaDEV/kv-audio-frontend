import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  IconButton, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Avatar, 
  Divider,
  CircularProgress,
  LinearProgress,
  useTheme,
  Container
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  People as PeopleIcon, 
  MusicNote as MusicNoteIcon, 
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AdminDashboard = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  
  // Sample data - replace with actual API calls
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTracks: 0,
    totalRevenue: 0,
    newUsers: 0
  });
  
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentTracks, setRecentTracks] = useState([]);
  
  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setStats({
        totalUsers: 1245,
        totalTracks: 842,
        totalRevenue: 28650,
        newUsers: 48
      });
      
      setRecentUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', joinDate: '2023-10-15', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinDate: '2023-10-14', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 3, name: 'Robert Johnson', email: 'robert@example.com', joinDate: '2023-10-13', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { id: 4, name: 'Emily Davis', email: 'emily@example.com', joinDate: '2023-10-12', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
      ]);
      
      setRecentTracks([
        { id: 1, title: 'Summer Vibes', artist: 'DJ Sunshine', downloads: 245, revenue: 1225 },
        { id: 2, title: 'Midnight Dreams', artist: 'Luna Echo', downloads: 189, revenue: 945 },
        { id: 3, title: 'Urban Rhythm', artist: 'City Beats', downloads: 302, revenue: 1510 },
        { id: 4, title: 'Ocean Waves', artist: 'Aqua Sound', downloads: 156, revenue: 780 },
      ]);
      
      setLoading(false);
    }, 1500);
  }, []);
  
  // Chart data
  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 2780 },
    { name: 'May', sales: 1890 },
    { name: 'Jun', sales: 2390 },
    { name: 'Jul', sales: 3490 },
    { name: 'Aug', sales: 4000 },
    { name: 'Sep', sales: 3000 },
    { name: 'Oct', sales: 2000 },
    { name: 'Nov', sales: 2780 },
    { name: 'Dec', sales: 3890 },
  ];
  
  const pieData = [
    { name: 'Hip Hop', value: 35 },
    { name: 'Electronic', value: 25 },
    { name: 'Rock', value: 20 },
    { name: 'Pop', value: 15 },
    { name: 'Other', value: 5 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading Dashboard...
        </Typography>
      </Box>
    );
  }
  
  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, py: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Welcome back! Here's what's happening with your audio platform today.
        </Typography>
        
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography color="text.secondary" variant="subtitle2">
                      Total Users
                    </Typography>
                    <Typography variant="h4" component="div" fontWeight="bold">
                      {stats.totalUsers.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                      +{stats.newUsers} this week
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                    <PeopleIcon />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography color="text.secondary" variant="subtitle2">
                      Total Tracks
                    </Typography>
                    <Typography variant="h4" component="div" fontWeight="bold">
                      {stats.totalTracks.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                      +24 this week
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 56, height: 56 }}>
                    <MusicNoteIcon />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography color="text.secondary" variant="subtitle2">
                      Total Revenue
                    </Typography>
                    <Typography variant="h4" component="div" fontWeight="bold">
                      ${stats.totalRevenue.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                      +8.2% this month
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56 }}>
                    <AttachMoneyIcon />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography color="text.secondary" variant="subtitle2">
                      Active Users
                    </Typography>
                    <Typography variant="h4" component="div" fontWeight="bold">
                      428
                    </Typography>
                    <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                      +12% this week
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'warning.main', width: 56, height: 56 }}>
                    <DashboardIcon />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Charts */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
                  Revenue Overview
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Monthly revenue performance
                </Typography>
                <Box sx={{ height: 300, mt: 2 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={salesData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sales" fill={theme.palette.primary.main} name="Revenue ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
                  Genre Distribution
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Track genres by percentage
                </Typography>
                <Box sx={{ height: 300, mt: 2, display: 'flex', justifyContent: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Recent Users and Tracks */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" component="h2" fontWeight="bold">
                    Recent Users
                  </Typography>
                  <Button variant="outlined" size="small">
                    View All
                  </Button>
                </Box>
                <TableContainer component={Paper} elevation={0}>
                  <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Join Date</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentUsers.map((user) => (
                        <TableRow key={user.id} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar src={user.avatar} sx={{ mr: 2, width: 32, height: 32 }} />
                              <Typography variant="body2">{user.name}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <IconButton size="small">
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" component="h2" fontWeight="bold">
                    Recent Tracks
                  </Typography>
                  <Button variant="outlined" size="small">
                    View All
                  </Button>
                </Box>
                <TableContainer component={Paper} elevation={0}>
                  <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Artist</TableCell>
                        <TableCell>Downloads</TableCell>
                        <TableCell>Revenue</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentTracks.map((track) => (
                        <TableRow key={track.id} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar variant="rounded" sx={{ mr: 2, width: 32, height: 32, bgcolor: 'primary.light' }}>
                                <MusicNoteIcon fontSize="small" />
                              </Avatar>
                              <Typography variant="body2">{track.title}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{track.artist}</TableCell>
                          <TableCell>{track.downloads}</TableCell>
                          <TableCell>${track.revenue}</TableCell>
                          <TableCell>
                            <IconButton size="small">
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Quick Actions and Performance */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                  <Button variant="contained" startIcon={<MusicNoteIcon />}>
                    Add New Track
                  </Button>
                  <Button variant="outlined" startIcon={<PeopleIcon />}>
                    Manage Users
                  </Button>
                  <Button variant="outlined" startIcon={<AttachMoneyIcon />}>
                    View Revenue Reports
                  </Button>
                  <Button variant="outlined" startIcon={<SettingsIcon />}>
                    System Settings
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
                  System Performance
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Server Load</Typography>
                    <Typography variant="body2" color="text.secondary">68%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={68} sx={{ mb: 2, height: 8, borderRadius: 4 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Storage Usage</Typography>
                    <Typography variant="body2" color="text.secondary">42%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={42} sx={{ mb: 2, height: 8, borderRadius: 4 }} color="success" />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Bandwidth</Typography>
                    <Typography variant="body2" color="text.secondary">89%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={89} sx={{ mb: 2, height: 8, borderRadius: 4 }} color="warning" />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Memory Usage</Typography>
                    <Typography variant="body2" color="text.secondary">35%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={35} sx={{ mb: 2, height: 8, borderRadius: 4 }} color="info" />
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Last updated: Today, 2:30 PM
                  </Typography>
                  <Button size="small">Refresh</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Recent Activity */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
                  Recent Activity
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                      <PeopleIcon fontSize="small" />
                    </Avatar>
                    <Box>
                      <Typography variant="body2">
                        <strong>New user registered:</strong> Jane Smith
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Today, 10:30 AM
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'success.light', mr: 2 }}>
                      <AttachMoneyIcon fontSize="small" />
                    </Avatar>
                    <Box>
                      <Typography variant="body2">
                        <strong>Payment received:</strong> $125.00 from John Doe
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Today, 9:15 AM
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'secondary.light', mr: 2 }}>
                      <MusicNoteIcon fontSize="small" />
                    </Avatar>
                    <Box>
                      <Typography variant="body2">
                        <strong>New track uploaded:</strong> "Summer Vibes" by DJ Sunshine
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Yesterday, 4:45 PM
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'warning.light', mr: 2 }}>
                      <NotificationsIcon fontSize="small" />
                    </Avatar>
                    <Box>
                      <Typography variant="body2">
                        <strong>System alert:</strong> Storage space is running low
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Yesterday, 2:30 PM
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'error.light', mr: 2 }}>
                      <SettingsIcon fontSize="small" />
                    </Avatar>
                    <Box>
                      <Typography variant="body2">
                        <strong>System maintenance:</strong> Scheduled for tomorrow at 2:00 AM
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Yesterday, 11:00 AM
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Button variant="text">View All Activity</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDashboard;

