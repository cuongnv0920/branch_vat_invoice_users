import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { roomApi } from "api";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import "./styles.scss";

Filter.propTypes = {
  search: PropTypes.func,
  filterRoom: PropTypes.func,
  filterStatus: PropTypes.func,
};

function Filter(props) {
  const { search, filterRoom, filterStatus } = props;
  const [roomList, setRoomList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roomFilter, setRoomFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const typingTimoutRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { roomList } = await roomApi.getAll();
      setRoomList(roomList);
    })();
  }, []);

  const handleSearchTermChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (typingTimoutRef.current) {
      clearTimeout(typingTimoutRef.current);
    }

    typingTimoutRef.current = setTimeout(() => {
      const formValue = {
        searchTerm: value,
      };

      if (search) {
        search(formValue);
      }
    }, 300);
  };

  const handleChangeRoom = (event) => {
    setRoomFilter(event.target.value);
    if (filterRoom) {
      filterRoom(event.target.value);
    }
  };
  const handleChangeStatus = (event) => {
    if (filterStatus) {
      setStatusFilter(event.target.value);
    }
  };

  return (
    <div className="filter">
      <Grid container spacing={3} className="filter__boxFilter">
        <Grid item xs={4} md={4} sm={4}>
          <TextField
            fullWidth
            onChange={handleSearchTermChange}
            value={searchTerm}
            label="Tìm kiếm..."
            size="small"
            name="search"
          />
        </Grid>
        <Grid item xs={4} md={4} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="select-label-room">Phòng/ ban</InputLabel>
            <Select
              labelId="select-label-room"
              value={roomFilter}
              label="Phòng/ ban"
              onChange={handleChangeRoom}
            >
              <MenuItem value="">Chọn tất cả...</MenuItem>
              {roomList.map((room, _) => (
                <MenuItem value={room.id}>{room.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} md={4} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="select-label-level">Trạng thái</InputLabel>
            <Select
              labelId="select-label-level"
              label="Trạng thái"
              value={statusFilter}
              onChange={handleChangeStatus}
            >
              <MenuItem value="">Chọn tất cả...</MenuItem>
              <MenuItem value={true}>Đã xử lý</MenuItem>
              <MenuItem value={false}>Chờ xử lý</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

export default Filter;
