import { Close, ExpandLess, ExpandMore } from "@mui/icons-material";
import { AppBar, Button, Collapse, Dialog, DialogActions, DialogContent, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Slide, Slider, Toolbar, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { ISubCategory } from "../../interface";
import { useLazyGetCategoriesQuery } from "../../redux/api/Product";
import { serializeFormQuery } from "../../utils";
import { CloseEyesIcon } from "../icons";

interface IFilterModalProps {
    open: boolean, 
    searchParams:  URLSearchParams,
    close: () => void | any,
    setSearchParams: any;
    sub_categories?: ISubCategory[]
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function FilterModal({open, close, sub_categories, setSearchParams, searchParams}: IFilterModalProps){
    const initial_filters = {
        price: [1000, 300000],
        category: {
            open: false,
            selected: ""
        }
    }
    const [filters, setFilters] = useState<{
        price: number | number[] | any,
        category: {
            open: boolean,
            selected: string
        }
    }>(initial_filters)

    let [categories, setCategories] = useState<any[]>()
    let [filters_as_changed, setFiltersAsChanged] = useState(0)
    let [getCategories, { data, loading }] = useLazyGetCategoriesQuery({
        selectFromResult: ({ data, isLoading }) => ({
            data: data?.result,
            loading: isLoading
        })
    })

    useEffect(() => {
        setFiltersAsChanged(state => state + 1)
    }, [filters])

    useEffect(() => {
        if(!sub_categories || sub_categories.length === 0){
            getCategories()
                .unwrap()
                .then(data => {
                    setCategories(data.result)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else{
            setCategories(sub_categories)
        }
    }, [loading, sub_categories])

    function applyFilters(){
        setSearchParams({
            ...serializeFormQuery(searchParams), 
            from: filters.price[0], 
            to: filters.price[1],
            parent_category: filters.category.selected
        })
        close()
    }

    return(
        <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={close}
        fullScreen>
            <AppBar color="inherit" sx={{ position: 'relative' }}>
                <Toolbar>
                    <Typography sx={{ flex: 1 }} variant="h6" component="div">
                        Filters
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={close}
                        aria-label="close"
                    >
                        <Close />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <List >
                <ListItem 
                    button
                    onClick={() => setFilters(state => ({...state, category: {...state.category, open: !state.category.open}}))}
                >
                    <ListItemText primary="Category" secondary={filters.category.selected} />
                    {
                        filters.category.open? 
                        <ExpandLess /> : 
                        <ExpandMore />
                    }
                </ListItem>

                <Collapse in={filters.category.open} unmountOnExit>
                    <List 
                        component="div" 
                        disablePadding
                        dense={true}>
                        {
                            categories?.map((category, idx) => (
                                <ListItemButton 
                                    sx={{ pl: 4 }}
                                    onClick={() => {
                                        setFilters(state => ({...state, category: {...state.category, open: false, selected: category.name}}))
                                    }}
                                >
                                    <ListItemText primary={category?.name} />
                                </ListItemButton>
                            ))
                        }
                    </List>
                </Collapse>

                <Divider />
                <ListItem>
                    <ListItemText 
                        primary="Price (₦)" 
                        className="text-left" 
                        sx={{
                            textAlign: "left"
                        }}
                    />
                </ListItem>
                <ListItem>
                    <form className="w-full">
                        <div>
                            <Slider
                                value={filters.price}
                                defaultValue={filters.price}
                                min={1000}
                                max={300000}
                                valueLabelDisplay="auto"
                                onChange={(e, v) => setFilters(state => ({...state, price: v}))}
                                color="secondary"
                                getAriaValueText={(value) => "₦ " + value}
                            />
                        </div>
                        <div className="flex w-full justify-between h-[40px] space-x-2 py-1">
                            <input 
                                type="number" 
                                className="rounded-md w-1/2 h-full border border-[#E8E5FF] px-3" 
                                placeholder="₦ from"  
                                value={filters.price[0]}
                                onChange={(e) => setFilters(state => ({...state, price: [e.target.value, state.price[1]]}))}
                            />
                            <input 
                                type="number" 
                                className="rounded-md w-1/2 h-full border border-[#E8E5FF] px-3" 
                                placeholder="₦ to" 
                                value={filters.price[1]}
                                onChange={(e) => setFilters(state => ({...state, price: [state.price[0], e.target.value]}))}
                            />
                        </div>
                    </form>
                </ListItem>
                
                <Divider />
            </List>
            <DialogActions className="fixed bottom-0 right-0 left-0 py-2 bg-white">
                <Button
                    color="secondary"
                    variant="outlined"
                    fullWidth
                    disabled={filters_as_changed < 2}
                    onClick={() => {
                        setFilters(initial_filters)
                        setFiltersAsChanged(0)
                    }}
                    size="large"
                >RESET</Button>
                <Button
                    color="secondary"
                    variant="contained"
                    fullWidth
                    onClick={applyFilters}
                    size="large"
                >APPLY</Button>
            </DialogActions>
        </Dialog>
    )
}

export default FilterModal