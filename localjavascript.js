var projpdata, searchdata;

$(document).ready(function(){
    $.getJSON("http://starlord.hackerearth.com/kickstarter", function( data ) {
        projpdata = data.slice(1)
        searchdata = projpdata
        $('#title').click(function(){
            searchdata = searchdata.sort(function (a, b) {
                return a.title.localeCompare( b.title );
            });
            newdata(searchdata);
        });
        $('#alldefault').click(function(){   
            searchdata = searchdata.sort(function (a, b) {
                return a.by.localeCompare( b.by );
            });
            newdata(searchdata);
        });
        $('#searchfor').keyup(function(){
            var searchedText = ($('#searchfor').val()).toLowerCase();
            var tempdata = [];
            if (searchedText){
                $.each(projpdata, function( key, val ) {
                    var testStr = (val["title"]).toLowerCase();
                    if (testStr.indexOf(searchedText) >= 0){
                        tempdata.push(val)     
                    }
                });
                if (tempdata.length > 0)
                {
                    searchdata = tempdata
                }
                else{
                    searchdata = projpdata
                }
            }
            else{
                searchdata = projpdata
            }
            newdata(searchdata);
        });
        var defaultOpts = {
            totalPages: searchdata.length / 10 ,
            visiblePages: 6,
            next: 'Next',
            prev: 'Prev',
            onPageClick: function (event, page) {
                //fetch content and render here
                $("#page-content").empty();
                end = page*10;
                start = end-10;
                newsdatalist = searchdata.slice(start,end);
                $.each(newsdatalist, function( key, val ) {
                    timediff = Math.abs(getTimeDiff(val['end.time']));
                    url = "https://www.kickstarter.com/" + val['url']
                    $("#page-content").append('<div class="well"><div><span class="main-content"><b><a  target="_blank" href='+url+'>'+val["s.no"]+'.'+val["title"]+'</a></b></span><span class="extra-content">&nbsp&nbsp&nbsp( Creator:&nbsp'+val["by"]+')</span></div><div class="shiftme"><span> Amt Pledged : &nbsp'+ val["amt.pledged"]+'</span><span>'+val["currency"]+'</span></div><div class="shiftme"><span> No Backers : &nbsp'+ val["num.backers"]+'</span></div><div class="shiftme"><span> No Of Days to Go : &nbsp'+timediff+'</span></div><div class="shiftme"><span> State : &nbsp'+val["state"]+'</span><span> &nbsp ||&nbspCountry : &nbsp'+val["country"]+'</span></div></div>');
                });
            }    
        };
        var $pagination = $('#pagination-demo');   
        $pagination.twbsPagination(defaultOpts);
 
    });    
    
    function newdata(tempd){
        searchdata = tempd
        $("#page-content").empty();
            newsdatalist = searchdata.slice(0,10);
            $.each(newsdatalist, function( key, val ) {
                timediff = Math.abs(getTimeDiff(val['end.time']));
                url = "https://www.kickstarter.com/" + val['url']
                $("#page-content").append('<div class="well"><div><span class="main-content"><b><a  target="_blank" href='+url+'>'+val["s.no"]+'.'+val["title"]+'</a></b></span><span class="extra-content">&nbsp&nbsp&nbsp( Creator:&nbsp'+val["by"]+')</span></div><div class="shiftme"><span> Amt Pledged : &nbsp'+ val["amt.pledged"]+'</span><span>'+val["currency"]+'</span></div><div class="shiftme"><span> No Backers : &nbsp'+ val["num.backers"]+'</span></div><div class="shiftme"><span> No Of Days to Go : &nbsp'+timediff+'</span></div><div class="shiftme"><span> State : &nbsp'+val["state"]+'</span><span> &nbsp ||&nbspCountry : &nbsp'+val["country"]+'</span></div></div>');
            });
            var pagination = jQuery('#pagination-demo').data('twbsPagination');
            pagination.options.totalPages = Math.ceil(searchdata.length / 10);            
    }
    
    function getTimeDiff(starttime){
        var start = new Date(starttime)
        var end = new Date();
        var difference = new Date(start - end);
        var days = difference/1000/60/60/24;
        return Math.floor(days)
    }


});