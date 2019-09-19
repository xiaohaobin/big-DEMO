function buildTimeSelection(name, type, val) {
	var total = (type == 'hour') ? 24 : 60;
	document.writeln('<select name='+name+'>');
	var i;
	for(i=0;i<total;i++) {
		var j = i<10?  '0'+i : i;
		var selected = '';
		if(j == val) {
			selected = 'selected ';
		}
		document.writeln("<option " + selected + "value='"+j+"'>"+j+"</option>");
	} 
	document.writeln('</select>');
}

///////////////////////////////////////////////////////////////////////////////////

function OpenUrl(url)
{
	win_name = "win_" + Math.floor(100000*Math.random()+1);	
	w = window.open(url, win_name, "toolbar=0,location=0,directories=0,menubar=0,scrollbars=1,resizable=1,width=930,height=620,left=200,top=50");
	w.focus();
}

///////////////////////////////////////////////////////////////////////////////////

function OpenRSSI(system)
{
	win_name = "win_" + Math.floor(100000*Math.random()+1);	
	w = window.open("rssi_radar.php?sysid=" + system, win_name, "toolbar=0,location=0,directories=0,menubar=0,scrollbars=1,resizable=1,width=790,height=620,left=200,top=50");
	w.focus();
}

///////////////////////////////////////////////////////////////////////////////////

function getData(type) 
{
	var f = document.fAdvData;
	
	var sFrom = f.stdate.value 
			+ "_" + f.shour.options[f.shour.selectedIndex].value
			+ "-" + f.smin.options[f.smin.selectedIndex].value
			+ "-00";
			
	var sTo = f.edate.value 
			+ "_" + f.ehour.options[f.ehour.selectedIndex].value
			+ "-" + f.emin.options[f.emin.selectedIndex].value
			+ "-60";
			
	var sUID = escape(f.sMgmtu.options[f.sMgmtu.selectedIndex].value);
	var sSrc = escape(f.sDSrc.options[f.sDSrc.selectedIndex].value);
	var sDataset = escape(f.sDSet.options[f.sDSet.selectedIndex].value);
	var nFreq = f.freq.options[f.freq.selectedIndex].value;

	if (sFrom > sTo) 
	{
		alert("'From' cannot be later than 'To'.");
		return;
	}
	
	var sFileType = type ? "load_graph.php" : "get_data.php";

	var sUrl = "https://datacenter.tigoenergy.com/main/" + sFileType
		 + "?from=" + sFrom
		 + "&to=" + sTo 
		 + "&uid=" + sUID
		 + "&freq=" + nFreq 
		 + "&dataset=" + sDataset 
		 + "&src=" + sSrc;

	if (type) 
	{
		OpenUrl(sUrl);
	} 
	else 
	{
		location.href = sUrl + "&z=1";
	}
}

///////////////////////////////////////////////////////////////////////////////////

function changeDataset(tbrows,type) {
	var start = 0;
	var totalrow = jsdata.length;
	if(type == 'next') {
		start = current_row + tbrows;
	} else if(type == 'first') {
		start = 0;
	} else if(type == 'prev') {
		start = current_row - tbrows;
	} else if(type == 'last') {
		start = (Math.ceil(totalrow / tbrows) -1) * tbrows;
	}
	var end = start+tbrows;
	end = end > jsdata.length ? jsdata.length : end;

	if((start > end) || (start <0)){
		return;
	}
	
/*
	var rows = '';
	for(var i=start; i<end; i++) {
		rows += "<tr>";
		for (var key in jsdata[i]) {
			rows += "<td>" + jsdata[i][key] + "</td>";	
		}
		rows += "</tr>";
	}
	document.getElementById('allrows').innerHTML = rows;
*/
	
	current_row = start;
	var ctrl = document.getElementById('allrows');
	removeChildNodes(ctrl);

	for(var i=start; i<end; i++) {
		var row = document.createElement('tr');
		for (var key in jsdata[i]) {
			var cell = document.createElement('td');
			var celltext = document.createTextNode(jsdata[i][key]);
			cell.appendChild(celltext);
			row.appendChild(cell);
		}
		ctrl.appendChild(row);	
	}
	
}

function removeChildNodes(ctrl) {
	while (ctrl.childNodes[0])
  	{
    		ctrl.removeChild(ctrl.childNodes[0]);
  	}
}

function changeEventDataset(tbrows,type) {
       var start = 0;
        var totalrow = jsdata.length;
        if(type == 'next') {
                start = current_row + tbrows;
        } else if(type == 'first') {
                start = 0;
        } else if(type == 'prev') {
                start = current_row - tbrows;
        } else if(type == 'last') {
                start = (Math.ceil(totalrow / tbrows) -1) * tbrows;
        }
        var end = start+tbrows;
        end = end > jsdata.length ? jsdata.length : end;

        if((start > end) || (start <0)){
                return;
        }

        current_row = start;
        var ctrl = document.getElementById('allrows');
        removeChildNodes(ctrl);

        for(var i=start; i<end; i++) {
                var row = document.createElement('tr');

                var event_type = jsdata[i]['event_type_id'];
                var type_img = '';
                switch(event_type) {
                case 1:
                        type_img = 'info.png';
                        break;
                case 2:
                        type_img = 'warning.png';
                        break;
                case 3:
                        type_img = 'error.png';
                        break;
                }

                var cell = document.createElement('td');
                var celltext = document.createElement('img');
		celltext.src='/images/' + type_img;
                 cell.appendChild(celltext);
                 row.appendChild(cell);

                var allkeys = new Array('type_name','label','datetime','description');
                for(var j=0; j<4; j++) {
			var key = allkeys[j];
                        var cell = document.createElement('td');
                        var celltext = document.createTextNode(jsdata[i][key]);
                        cell.appendChild(celltext);
                        row.appendChild(cell);
                }

                var cell = document.createElement('td');
                var ischecked = false;
                var isdisabled = false;
                if(jsdata[i]['acknowledged']){
                        ischecked = true;
                        isdisabled = true;

                }
                celltext = document.createElement('input');
                celltext.type='checkbox';
                celltext.name='list';
                celltext.id=jsdata[i]['id'];
                celltext.checked=ischecked;
		celltext.disabled = isdisabled;
                 cell.appendChild(celltext);
		celltext.setAttribute("checked",ischecked);
		celltext.setAttribute("name",'list');
                 row.appendChild(cell);

                ctrl.appendChild(row);
        }

	return;

}

function SelectTab(nTab, total,fname,img_path){
        var i;

	if(fname==null) {
		fname = 'subtab';
	}

	if(img_path == null) {
		img_path = '/images';
	}

        for (i=0; i<total; i++)
        {
                var pTab = GetItem("tab_" + i);
                var pData = GetItem("content_tab" + i);

                if (pTab == null || pData == null) continue;

                if (nTab == i)
                {
                        pTab.src = img_path + "/"+fname+i+"_selected.png";
                        pData.style.display = "block";
                }
                else
                {
                        pTab.src = img_path + "/"+fname+i+".png";
                        pData.style.display = "none";
                }
        }


}

function ChangeTab(nTab,total) {
	var i;
	for(i=0;i<total;i++) {
	        var pTab = GetItem("tab_" + i);
                var pData = GetItem("content_tab" + i);

                if (pTab == null || pData == null) continue;

                if (nTab == i)
                {
                        pTab.className = 'subtab_selected';
                        if (nTab==0) {
                        	pTab.className = 'subtab_selected_first';
                        }
                        pData.style.display = "block";
                }
                else
                {
                        pTab.className = 'subtab';
                        pData.style.display = "none";
                }

	}
}

function GetItem(id)
{
        var pItem = null;

        if (document.layers) pItem = document[id];
        else if (document.all) pItem = document.all[id];
        else if (document.getElementById) pItem = document.getElementById(id);

        return pItem;
}

function displayNext(tbname, num, total) {
	var currpage = document.getElementById('currpage').innerHTML;
        document.getElementById(tbname+currpage).style.display='none';

        if(num == 'first') {
                currpage = 1;
                document.getElementById('btnFirst').setAttribute("disabled","disabled");
                document.getElementById('btnPrev').setAttribute("disabled","disabled");
                document.getElementById('btnLast').removeAttribute("disabled");
                document.getElementById('btnNext').removeAttribute("disabled");
        } else if(num == 'prev') {
                document.getElementById('btnLast').removeAttribute("disabled");
                document.getElementById('btnNext').removeAttribute("disabled");
                if(currpage >1 ) {
                        currpage-- ;
                        if (currpage==1) {
                        	document.getElementById('btnFirst').setAttribute("disabled","disabled");
                			document.getElementById('btnPrev').setAttribute("disabled","disabled");
                        }
                }
        } else if(num == 'next') {
                document.getElementById('btnFirst').removeAttribute("disabled");
                document.getElementById('btnPrev').removeAttribute("disabled");
                if(currpage < total) {
                        currpage++ ;
                        if (currpage==total) {
                        	document.getElementById('btnLast').setAttribute("disabled","disabled");
               				document.getElementById('btnNext').setAttribute("disabled","disabled");
                        }
                }
        } else if(num == 'last') {
                currpage = total;
                document.getElementById('btnLast').setAttribute("disabled","disabled");
                document.getElementById('btnNext').setAttribute("disabled","disabled");
                document.getElementById('btnFirst').removeAttribute("disabled");
                document.getElementById('btnPrev').removeAttribute("disabled");
        }

        document.getElementById('currpage').innerHTML = currpage;

        document.getElementById(tbname+currpage).style.display='';
        
        if (document.getElementById('currpage').innerText) {
        	document.getElementById('currpage').innerText = currpage;	
        }
        else {
        	document.getElementById('currpage').textContent = currpage;
        }

}

function getCurrentDate() {
	return readCookie('currdate');
}

function setCurrentDate(dt) {
	createCookie('currdate', dt,0);
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function removeAll(selectbox) {
        var i;
        for(i=selectbox.options.length-1;i>=0;i--)
                selectbox.remove(i);
}