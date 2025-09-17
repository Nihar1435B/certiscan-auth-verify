import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Clock, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  FileText,
  Calendar,
  Filter
} from "lucide-react";

export function VerificationHistory() {
  const [verifications] = useState([
    {
      id: 1,
      fileName: "john_doe_certificate.pdf",
      studentName: "John Doe",
      certificateId: "CERT-2024-001",
      course: "Computer Science",
      verificationDate: "2024-01-20 14:30",
      status: "valid",
      verifiedBy: "admin@university.edu"
    },
    {
      id: 2,
      fileName: "jane_smith_diploma.jpg",
      studentName: "Jane Smith",
      certificateId: "CERT-2024-002",
      course: "Business Administration",
      verificationDate: "2024-01-20 13:15",
      status: "invalid",
      verifiedBy: "admin@university.edu"
    },
    {
      id: 3,
      fileName: "mike_johnson_cert.pdf",
      studentName: "Mike Johnson",
      certificateId: "CERT-2023-456",
      course: "Engineering",
      verificationDate: "2024-01-19 16:45",
      status: "valid",
      verifiedBy: "admin@university.edu"
    },
    {
      id: 4,
      fileName: "sarah_wilson_degree.pdf",
      studentName: "Sarah Wilson",
      certificateId: "CERT-2024-003",
      course: "Medicine",
      verificationDate: "2024-01-19 11:20",
      status: "invalid",
      verifiedBy: "admin@university.edu"
    },
    {
      id: 5,
      fileName: "alex_brown_certificate.jpg",
      studentName: "Alex Brown",
      certificateId: "CERT-2023-789",
      course: "Law",
      verificationDate: "2024-01-18 09:30",
      status: "valid",
      verifiedBy: "admin@university.edu"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const filteredVerifications = verifications.filter(verification => {
    const matchesSearch = 
      verification.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verification.certificateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verification.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verification.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || verification.status === statusFilter;
    
    // For date filter, we would normally check actual dates
    // For now, just include all for "all" filter
    const matchesDate = dateFilter === "all";
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusIcon = (status: string) => {
    return status === 'valid' 
      ? <CheckCircle className="h-4 w-4 text-green-600" />
      : <AlertCircle className="h-4 w-4 text-red-600" />;
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge 
        variant={status === 'valid' ? 'default' : 'destructive'}
        className={status === 'valid' ? 'bg-green-600' : ''}
      >
        {status === 'valid' ? 'VALID' : 'INVALID'}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Verification History</h2>
        <p className="text-muted-foreground">
          View and search through recent certificate verifications (last 7 days)
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter & Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, ID, course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="valid">Valid Only</SelectItem>
                  <SelectItem value="invalid">Invalid Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All dates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Recent Verifications</span>
            </div>
            <Badge variant="outline">{filteredVerifications.length} results</Badge>
          </CardTitle>
          <CardDescription>
            Certificate verification records from the past week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Student Details</TableHead>
                <TableHead>Certificate Info</TableHead>
                <TableHead>Verification Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verified By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVerifications.map((verification) => (
                <TableRow key={verification.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono text-sm">{verification.fileName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{verification.studentName}</div>
                      <div className="text-sm text-muted-foreground">{verification.course}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-sm">{verification.certificateId}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{verification.verificationDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(verification.status)}
                      {getStatusBadge(verification.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {verification.verifiedBy}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredVerifications.length === 0 && (
            <div className="text-center py-8">
              <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No verifications found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all" || dateFilter !== "all"
                  ? "No verifications match your current filters."
                  : "No certificate verifications have been performed yet."
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}