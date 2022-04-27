import React, { useState, useEffect } from 'react';

import MainLayout from '../components/Layout/MainLayout'
import { Route, Redirect, useLocation } from 'react-router-dom'

import AuditsMain from '../components/Audits/main';
import NewAudit from '../components/Audits/newAudit';
import BlogsMain from '../components/Blogs/main';
import NewBlog from '../components/Blogs/newBlog';
import EditBlog from '../components/Blogs/editBlog';

import Settings from '../components/Auth/Settings';



const AuthRoutes = () => {

    const location = useLocation()

    if(location.pathname === '/') {
      return <Redirect to={'/blogs'} />
    }

    return (
        <MainLayout>
          <Route exact path="/audits" component={AuditsMain} />
          <Route path="/audits/addNew" component={NewAudit} />
          <Route exact path="/blogs" component={BlogsMain} />
          <Route path="/blogs/addNew" component={NewBlog} />
          <Route path="/blogs/update/:id" component={EditBlog} />

          <Route path="/settings" component={Settings} />



        </MainLayout>
    );
  }
  
export default AuthRoutes