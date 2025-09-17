import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Upload, 
  Database, 
  Search, 
  Trash2, 
  FileText,
  Calendar,
  Users
} from "lucide-react";

export function DatasetManager() {
  const [datasets] = useState([
    {
      id: 1,
      name: "Bachelor Degrees 2020-2024",
      recordCount: 1250,
      uploadDate: "2024-01-15",
      lastAccessed: "2024-01-20",
      status: "active"
    },
    {
      id: 2,
      name: "Master Degrees 2022-2024",
      recordCount: 340,
      uploadDate: "2024-01-10",
      lastAccessed: "2024-01-19",
      status: "active"
    },
    {
      id: 3,
      name: "Certificate Programs 2023",
      recordCount: 89,
      uploadDate: "2023-12-20",
      lastAccessed: "2024-01-18",
      status: "active"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredDatasets = datasets.filter(dataset =>
    dataset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Implement dataset upload
      console.log("Uploading dataset:", file.name);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dataset Management</h2>
          <p className="text-muted-foreground">
            Manage your organization's certificate datasets for verification
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Dataset
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Dataset</DialogTitle>
              <DialogDescription>
                Upload a CSV or Excel file containing certificate records
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dataset-name">Dataset Name</Label>
                <Input 
                  id="dataset-name" 
                  placeholder="e.g., Bachelor Degrees 2024" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataset-file">Dataset File</Label>
                <Input
                  id="dataset-file"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                />
                <p className="text-sm text-muted-foreground">
                  Supported formats: CSV, Excel (XLSX, XLS)
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Upload Dataset</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Search Datasets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search datasets by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Datasets Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Active Datasets</span>
          </CardTitle>
          <CardDescription>
            Currently active datasets in your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dataset Name</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Last Accessed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDatasets.map((dataset) => (
                <TableRow key={dataset.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{dataset.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{dataset.recordCount.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{dataset.uploadDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>{dataset.lastAccessed}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{dataset.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredDatasets.length === 0 && (
            <div className="text-center py-8">
              <Database className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No datasets found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "No datasets match your search criteria." : "Upload your first dataset to get started."}
              </p>
              {!searchTerm && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload First Dataset
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Your First Dataset</DialogTitle>
                      <DialogDescription>
                        Get started by uploading your organization's certificate records
                      </DialogDescription>
                    </DialogHeader>
                    {/* Same upload form as above */}
                  </DialogContent>
                </Dialog>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}